const express = require('express');
const fs = require('fs');
const app = express();
const dir = __dirname;

const tours = JSON.parse(
  fs.readFileSync(`${dir}/dev-data/data/tours-simple.json`)
);

app.use(express.json()); // this is behaving as the middleware. Middleware is necessary for the post request. If no middleware then no connection

const getAllTours = (req, res) => {
  res.status(200).json({
    statusCode: 200,
    count: tours.length,
    status: 'success',
    data: { tours },
  });
};

const getTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.filter((item) => item.id === Number(id));
  res.status(200).json({
    statusCode: 200,
    status: 'success',
    data: { tour },
  });
};

const saveTour = (req, res) => {
  const newId = tours[tours.length - 1]?.id + 1;
  const newTour = {
    id: newId,
    ...req.body,
  };
  tours.push(newTour);
  fs.writeFile(
    `${dir}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        statusCode: 201,
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id;
  const newTours = tours.map((item) => {
    if (item.id === Number(id)) {
      return {
        ...item,
        ...req.body,
      };
    } else {
      return item;
    }
  });

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    data: {
      tours: newTours,
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    statusCode: 204,
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).post(saveTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
