using AutoMapper;

namespace Server.Services.Impl
{
    public class BaseService<TEntity, TDto>
    {
        private readonly IMapper _mapper;

        protected BaseService(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected TEntity ToEntity(TDto dto)
        {
            return _mapper.Map<TEntity>(dto);
        }
        
        protected TDto ToDto(TEntity entity)
        {
            return _mapper.Map<TDto>(entity);
        }
    }
}