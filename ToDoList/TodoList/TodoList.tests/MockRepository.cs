using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TodoList.Repositories.Interfaces;

namespace TodoList.tests
{
    public class MockRepository<T> : IRepository<T> where T : class
    {
        public List<T> _context;

        public MockRepository(List<T> ctx)
        {
            _context = ctx;
        }

        public T GetOne(Expression<Func<T, bool>> predicate)
        {
            // var entity = _context.Where(predicate).SingleOrDefault();
            // return entity;
            return _context.FirstOrDefault();
        }

        public virtual IEnumerable<T> GetAll()
        {
            return _context.AsQueryable();
        }

        public virtual void Add(T entity)
        {
            _context.Add(entity);
        }

        public virtual void Remove(T entity)
        {
            _context.Remove(entity);
        }

        public virtual void Update(T entity)
        {
            var entry = _context.Where(s => s == entity).SingleOrDefault();
            entry = entity;
        }
    }
}
