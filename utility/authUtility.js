export function verifyToken(req,res){
    const header=req.headers['authorization'];
    const token=header && header.split(' ')[1];
    if(!token){
        res.writeHead(401, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Unauthorized' }));
    }
    return token;
}
