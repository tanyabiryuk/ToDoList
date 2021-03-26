using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TodoList.Repositories.Interfaces;

namespace TodoList.Repositories.Implementations
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly DbSet<TEntity> _dbSet;

        public Repository(DbSet<TEntity> dbSet)
        {
            _dbSet = dbSet;
        }

        public TEntity GetOne(Expression<Func<TEntity, bool>> predicate)
        {
            var entity = _dbSet.Where(predicate).SingleOrDefault();
            return entity;
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _dbSet.ToList();
        }


        public void Remove(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public void Add(TEntity entity)
        {
            _dbSet.Add(entity);
        }

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

    }
}
