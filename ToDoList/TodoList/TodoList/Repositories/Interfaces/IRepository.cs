using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace TodoList.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity GetOne(Expression<Func<TEntity, bool>> predicate);

        IEnumerable<TEntity> GetAll();

        void Remove(TEntity entity);

        void Add(TEntity entity);

        void Update(TEntity entity);
    }
}
