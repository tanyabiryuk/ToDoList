using System;
using System.Threading.Tasks;

namespace TodoList.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        Task<int> SaveChanges();

        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
    }
}
