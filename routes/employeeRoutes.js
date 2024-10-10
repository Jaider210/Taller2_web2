const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/fileOperations');
const Joi = require('joi');

// Validación de empleados
const employeeSchema = Joi.object({
    codigo_empleado: Joi.string().required(),
    name: Joi.string().required(),
    Departamento: Joi.string().required(),
    Posicion: Joi.string().required(),
    Salario: Joi.number().required(),
    Fecha_Ingreso: Joi.date().required(),
    Activo: Joi.boolean().required()
});

// Obtener todos los empleados
router.get('/employees', (req, res) => {
    const employees = readData();
    res.json(employees); 
});

// Obtener un empleado por su código
router.get('/employees/:codigo_empleado', (req, res) => {
    const employees = readData();
    const employee = employees.find(e => e.codigo_empleado === req.params.codigo_empleado);
    employee ? res.json(employee) : res.status(404).send('Empleado no encontrado');
});

// Agregar un nuevo empleado
router.post('/employees', (req, res) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employees = readData();
    const nuevoEmpleado = { id: employees.length + 1, ...req.body };
    employees.push(nuevoEmpleado);
    writeData(employees);
    res.status(201).json(nuevoEmpleado);
});

// Actualizar un empleado
router.put('/employees/:codigo_empleado', (req, res) => {
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employees = readData();
    const employeeIndex = employees.findIndex(e => e.codigo_empleado === req.params.codigo_empleado);
    if (employeeIndex === -1) return res.status(404).send('Empleado no encontrado');

    employees[employeeIndex] = { ...employees[employeeIndex], ...req.body };
    writeData(employees);
    res.json(employees[employeeIndex]);
});

// Eliminar un empleado
router.delete('/employees/:codigo_empleado', (req, res) => {
    const employees = readData();
    const employeeIndex = employees.findIndex(e => e.codigo_empleado === req.params.codigo_empleado);
    if (employeeIndex === -1) return res.status(404).send('Empleado no encontrado');

    employees.splice(employeeIndex, 1);
    writeData(employees);
    res.status(204).send();
});

module.exports = router;