
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<body><h1>Hello, user!</h1></body>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"></input><button>Submit</button></form>');
        res.write('</html>');
        return res.end()
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>');
        res.write('</html>');
        return res.end()
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/')
            return res.end()
        })
    }

};

module.exports = requestHandler;