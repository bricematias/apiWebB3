const db = require('./models/index');
const app = require('./app');

db.instance.sync({force: false}).then(() => {
    console.log('Database connected an synchronized');
    app.listen(3000, () => {
        console.log('Server running on port 3000 !');
        });
    }).catch((e) => {
        console.error(e);
    });