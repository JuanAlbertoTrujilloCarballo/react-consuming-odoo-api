# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class Empresa(http.Controller):

    @http.route('/api/empresa/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        empresa_rec = request.env['empresa.empresa'].sudo().search([])
        empresa = []
        for rec in empresa_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'empresa': rec.empresa,
                'descripcion': rec.descripcion,
                'empleados': rec.empleados,
                'pagos': rec.pagos,
                'dinero_gastado': rec.dinero_gastado
            }
            empresa.append(vals)
        return {'status': 200, 'response': empresa, 'message': 'Success'}

    @http.route('/api/empresa/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['empresa.empresa']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
            'id': rec.id,
            'name': rec.name,
            'empresa': rec.empresa,
            'descripcion': rec.descripcion,
            'empleados': rec.empleados,
            'pagos': rec.pagos,
            'dinero_gastado': rec.dinero_gastado
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data

    @http.route('/api/empresa/findById', type="json", auth="public", csrf=True, cors='*')
    def findById(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['id'] + '%'
        companies_rec = request.env['empresa.empresa'].sudo().search(
            [('id', '=ilike', reg_exp)])
        companies = []
        for rec in companies_rec:
            vals = {
                'id': rec.id,
                'name':rec.name,
                'empresa': rec.empresa,
                'descripcion': rec.descripcion,
                'empleados': rec.empleados,
                'pagos': rec.pagos,
                'dinero_gastado': rec.dinero_gastado
            }
            companies.append(vals)
        return {'status': 200, 'response': companies, 'message': 'Success'}

    @http.route('/api/empresa/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["empresa.empresa"]
        record = model_to_post.sudo().create(data)
        return record.id

    @http.route('/api/empresa/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["empresa.empresa"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/empresa/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["empresa.empresa"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/empresa/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["empresa.empresa"].sudo()

        # .with_context(active_test=False) to also find inactive records.
        all_companies = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_companies.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data
