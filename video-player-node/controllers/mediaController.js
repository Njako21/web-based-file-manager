const path = require('path');
const fs = require('fs');
const mediaDir = path.join(__dirname, '..', 'public', 'media');

exports.getMedia = (req, res) => {
  const reqPath = req.params[0] || '';
  const dirPath = path.join(mediaDir, reqPath);

  console.log(`Received request for: ${dirPath}`);

  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Failed to read directory:", err);
      return res.status(500).json({ error: 'Failed to read directory' });
    }

    const directories = [];
    const videos = [];
    const images = [];
    const otherFiles = [];

    files.forEach(file => {
      if (file.isDirectory()) {
        directories.push(file.name);
      } else {
        const ext = path.extname(file.name).toLowerCase();
        if (['.mp4', '.webm', '.ogg', '.mov'].includes(ext)) {
          videos.push(file.name);
        } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
          images.push(file.name);
        } else {
          otherFiles.push(file.name);
        }
      }
    });

    const response = {
      directories,
      videos,
      images,
      files: otherFiles,
    };

    console.log(`Sending response:`, response);
    res.json(response);
  });
};

exports.serveVideo = (req, res) => {
  const filePath = path.join(mediaDir, req.params.path);
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error("File not found:", err);
      return res.status(404).end('File not found');
    }

    const range = req.headers.range;
    if (!range) {
      return res.status(416).send('Requires Range header');
    }

    const positions = range.replace(/bytes=/, '').split('-');
    const start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    const chunksize = (end - start) + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });

    const stream = fs.createReadStream(filePath, { start, end })
      .on('open', () => {
        stream.pipe(res);
      }).on('error', (err) => {
        console.error(err);
        res.end(err);
      });
  });
};

exports.serveImage = (req, res) => {
  const filePath = path.join(mediaDir, req.params.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("File not found:", err);
      res.status(404).end('File not found');
    }
  });
};