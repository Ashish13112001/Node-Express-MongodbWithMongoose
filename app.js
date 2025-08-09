const express = require('express');
const fs = require('node:fs');
const app = express();


app.use(express.json()); // frontend s data json(string) formate m aata h to ye middleware usko jsObject m convert kar deta h. Eski vajah s ham req.body m data access kar sakte h
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message : 'Hello from server side'
//     });
// });

// app.post('/', (req, res) => {
//     res.status(200).json({
//         message: 'Your can post to this endpoint'
//     })
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    });
});

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });    
});

app.get('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    res.status(201).json({
        status: 'success',
        data : {
            tour: tour
        }
    });
});

app.patch('/api/v1/tours/:id', (req, res) =>{

    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Data updated'
        }
    });
});

app.delete('/api/v1/tours/:id', (req, res) =>{

    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});


const port = 3000;
app.listen(port, () => { console.log(`App running on port ${port}`)});