const express = require('express');
const fs = require('fs');
const morgan = require('morgan')
const app = express();
const dir = __dirname;

const tours = JSON.parse(
  fs.readFileSync(`${dir}/dev-data/data/tours-simple.json`)
);

const users = JSON.parse(
  fs.readFileSync(`${dir}/dev-data/data/users.json`)
);

// Middlewares
app.use(morgan('dev'));
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

// USER HANDLERS

const getAllUsers = (req, res) => {
  res.status(200).json({
    statusCode: 200,
    count: users.length,
    status: 'success',
    data: { users },
  });
};

const createUser = (req, res) => {
  const newUser = {
    _id: Math.random().toString(36).substr(2, 9),
    ...req.body,
  };
  users.push(newUser);
  fs.writeFile(
    `${dir}/dev-data/data/users.json`,
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          status: 'error',
          message: 'Error saving user',
        });
      }
      res.status(201).json({
        statusCode: 201,
        status: 'success',
        data: {
          user: newUser,
        },
      });
    }
  );
};

const getUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((item) => item._id === id);

  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      status: 'fail',
      message: 'User not found',
    });
  }

  res.status(200).json({
    statusCode: 200,
    status: 'success',
    data: { user },
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((item) => item._id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      statusCode: 404,
      status: 'fail',
      message: 'User not found',
    });
  }

  const updatedUser = {
    ...users[userIndex],
    ...req.body,
  };

  users[userIndex] = updatedUser;

  fs.writeFile(
    `${dir}/dev-data/data/users.json`,
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          status: 'error',
          message: 'Error updating user',
        });
      }
      res.status(200).json({
        statusCode: 200,
        status: 'success',
        data: {
          user: updatedUser,
        },
      });
    }
  );
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((item) => item._id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      statusCode: 404,
      status: 'fail',
      message: 'User not found',
    });
  }

  users.splice(userIndex, 1);

  fs.writeFile(
    `${dir}/dev-data/data/users.json`,
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          statusCode: 500,
          status: 'error',
          message: 'Error deleting user',
        });
      }
      res.status(204).json({
        status: 'success',
        statusCode: 204,
        data: null,
      });
    }
  );
};

// Routes

app.route('/api/v1/tours').get(getAllTours).post(saveTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).put(updateUser).delete(deleteUser);

// Server

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
