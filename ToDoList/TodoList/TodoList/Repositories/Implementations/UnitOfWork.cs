using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TodoList.Repositories.Interfaces;

namespace TodoList.Repositories.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(DbContext context)
        {
            Context = context;
        }

        private DbContext Context { get; }

        public void Dispose()
        {
            Context.Dispose();
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            return new Repository<TEntity>(Context.Set<TEntity>());
        }

        public async Task<int> SaveChanges()
        {
            return await Context.SaveChangesAsync();
        }
        
    }
}
