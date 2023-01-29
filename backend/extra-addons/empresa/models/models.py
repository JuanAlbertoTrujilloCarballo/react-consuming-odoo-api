# -*- coding: utf-8 -*-

from odoo import models, fields, api


class empresa(models.Model):
    _name = 'empresa.empresa'
    _description = 'empresa.empresa'

    name = fields.Integer(string="id")
    empresa = fields.Char(string="Nombre de la empresa")
    descripcion = fields.Text(string="Descripcion")
    empleados = fields.Integer(string="Cantidad de empleados")
    pagos = fields.Float(string="Dinero pagado a cada empleado")
    dinero_gastado = fields.Float(
        string="Dinero pagado", compute="_dinerogastado", store=True)
    proyectos = fields.One2many("project.project","particular",string="Proyectos")

    @api.depends('empleados', 'pagos')
    def _dinerogastado(self):
        for r in self:
            if r.empleados > 0:
                r.dinero_gastado = r.pagos*r.empleados


class empresa_project(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'
    
    particular = fields.Many2one("empresa.empresa",string="Empresa particular",ondelete="cascade")

class empresa_tareas(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'