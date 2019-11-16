/* Events.js -> Stores every route that represents EVENTS actions.
 * GETS/POSTS/UPDATES/DELETES, that are related to EVENTS;
 */

/* Import Packages
 * Models -> UpperCase first letter;
 * Packages -> SmallCase first letter;
 */
const Task = require('../models/task');
const express = require('express');
const mongoose = require('mongoose');

// Inits
const router = express.Router();

/*Events Functions
 * getEvents -> Will get events from mongodb
 * postEvent -> Will create a new event on mongodb
 * putEvent -> Will upate events from mondodb
 * deleteEvent -> Will delete events from mongodb
 */

/*Get Methods
 *  / -> GET ALL TASKS
 *  /id -> GET TASKS FROM ID
 */

// Get All Tasks
router.get('/', (request, response) => {
    Task.find()
        .exec()
        .then((task) => {
            if (task)
                response.status(200).json({
                    message: 'Results Found',
                    task
                });
        })
        .catch((error) => {
            response.status(500).json({
                message: 'Server does not recognize the request method!',
                error
            });
        })
})


// Get Single Task
router.get('/:id', (request, response) => {

    const taskId = request.params.id;

    Task.findById(taskId)
        .exec()
        .then((task) => {
            if (task) {
                response.status(200).json({
                    message: "Result Found for that Task!",
                    task
                });
            };
        })
        .catch((error) => {
            response.status(500).json({
                message: 'Server does not recognize the request method!',
                error
            });
        });
});
/*-----------------------------------------*/

/* Post Methods
 * / -> Post New Task
 */

// Post Task
router.post('/', (request, response) => {
    const newTask = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: request.body.title,
        description: request.body.description,
        initialDate: request.body.initialDate,
        finalDate: request.body.finalDate
    });

    newTask.save()
        .then((task) => {
            response.status(200).json({
                message: 'Task created with success',
                task
            });
        })
        .catch((error) => {
            response.status(500).json({
                message: 'Server does not recognize the request method!',
                error
            });
        })
});
/*-----------------------------------------*/

/*Put Methods
 * / -> Update All Tasks
 * /id -> Update Single Task
 */

// Update All Tasks
router.put('/', (request, response) => {
    Task.update()
        .exec()
        .then((task) => {
            if (task) {
                const taskUpdatedValues = request.body;

                const {
                    title,
                    description,
                    initialDate,
                    finalDate
                } = task;

                title = taskUpdatedValues.title ? taskUpdatedValues.title : title;
                description = taskUpdatedValues.description ? taskUpdatedValues.description : description;
                initialDate = taskUpdatedValues.initialDate ? taskUpdatedValues.initialDate : initialDate;
                finalDate = taskUpdatedValues.finalDate ? taskUpdatedValues.finalDate : finalDate;

                response.status(200).json({
                    message: 'Tasks updated with success',
                    task
                });
            }
        })
        .catch((error) => {
            response.status(500).json({
                message: 'Server does not recognize the request method!',
                error
            });
        })
});

// Update Single Task
router.put('/:id', (request, response) => {
    const taskId = request.params.id;

    Task.findByIdAndUpdate(taskId)
        .exec()
        .then((task) => {
            if (task) {
                const taskUpdatedValues = request.body;

                const {
                    title,
                    description,
                    initialDate,
                    finalDate
                } = task;

                title = taskUpdatedValues.title ? taskUpdatedValues.title : title;
                description = taskUpdatedValues.description ? taskUpdatedValues.description : description;
                initialDate = taskUpdatedValues.initialDate ? taskUpdatedValues.initialDate : initialDate;
                finalDate = taskUpdatedValues.finalDate ? taskUpdatedValues.finalDate : finalDate;

                response.status(200).json({
                    message: 'Task updated with success!',
                    task
                });
            }
        })
        .catch((error) => {
            response.status(500).json({
                message: 'Server does not recognize the request method!',
                error
            });
        });
});

/*-----------------------------------------*/

/* Delete Methods
 * / -> Delete All Tasks
 * / -> Delete Single Task
 */

// Delete All Tasks
router.delete('/', (request, response) => {
    Task.deleteMany()
        .exec()
        .then(() => {
            response.status(200).json({
                message: 'Tasks deleted with success'
            });
        })
        .catch(() => {
            response.status(500).json({
                message: 'Server does not recognize the request method',
                error
            });
        });
});

// Delete Single Task
router.delete('/:id', (request, response) => {
    const taskToDelete = request.params.id;

    Task.deleteOne(taskToDelete)
        .exec()
        .then(() => {
            response.status(200).json({
                message: 'Task deleted with success'
            })
        })
        .catch(() => {
            response.status(500).json({
                message: 'Server does not recognize the request method',
                error
            });
        });
});

/*-----------------------------------------*/

module.exports = router;