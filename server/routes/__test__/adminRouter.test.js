const request = require('supertest');
const mockingoose = require('mockingoose');
const app = require('../../../index');
const ShopItem = require('../../models/shopItem')
const authorizeAdmin = require('../../middleware/adminAuthorization')

jest.mock(authorizeAdmin, () => jest.fn((req, res, next) => next()));

beforeEach(() => {
  mockingoose.resetAll();
});

describe('Admin Routes', () => {

  describe('POST /admin/add', () => {
    it('should add a new shop item', async () => {
      const newItem = { title: 'New Item', price: 100, description: 'A new shop item' };
      mockingoose(ShopItem).toReturn(newItem, 'save');

      const res = await request(app)
        .post('/admin/add')
        .send(newItem);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(newItem);
    });

    it('should handle errors', async () => {
      mockingoose(ShopItem).toReturn(new Error('Save error'), 'save');

      const res = await request(app)
        .post('/admin/add')
        .send({ title: 'New Item' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Save error');
    });
  });

  describe('PUT /admin/update/:id', () => {
    it('should update a shop item', async () => {
      const updatedItem = { title: 'Updated Item' };
      mockingoose(ShopItem).toReturn(updatedItem, 'findOneAndUpdate');

      const res = await request(app)
        .put('/admin/update/507f1f77bcf86cd799439011')
        .send(updatedItem);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(updatedItem);
    });

    it('should handle errors', async () => {
      mockingoose(ShopItem).toReturn(new Error('Update error'), 'findOneAndUpdate');

      const res = await request(app)
        .put('/admin/update/507f1f77bcf86cd799439011')
        .send({ title: 'Updated Item' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Update error');
    });
  });

  describe('DELETE /admin/delete/:id', () => {
    it('should delete a shop item', async () => {
      const deletedItem = { _id: '507f1f77bcf86cd799439011', title: 'Deleted Item' };
      mockingoose(ShopItem).toReturn(deletedItem, 'findOneAndDelete');

      const res = await request(app)
        .delete('/admin/delete/507f1f77bcf86cd799439011');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Item deleted successfully');
    });

    it('should handle errors', async () => {
      mockingoose(ShopItem).toReturn(new Error('Delete error'), 'findOneAndDelete');

      const res = await request(app)
        .delete('/admin/delete/507f1f77bcf86cd799439011');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Delete error');
    });
  });

  describe('GET /admin/search', () => {
    it('should search shop items', async () => {
      const items = [{ title: 'Item 1' }, { title: 'Item 2' }];
      mockingoose(ShopItem).toReturn(items, 'find');

      const res = await request(app)
        .get('/admin/search')
        .query({ title: 'Item' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(items);
    });

    it('should handle errors', async () => {
      mockingoose(ShopItem).toReturn(new Error('Search error'), 'find');

      const res = await request(app)
        .get('/admin/search')
        .query({ title: 'Item' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Search error');
    });
  });

});
