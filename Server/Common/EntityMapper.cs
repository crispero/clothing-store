using AutoMapper;

namespace Server.Common
{
    public class EntityMapper
    {
        private readonly IMapper _mapper;

        public EntityMapper(IMapper mapper)
        {
            _mapper = mapper;
        }
        
        public TEntity ToEntity<TEntity, TDto>(TDto dto)
        {
            return _mapper.Map<TEntity>(dto);
        }
        
        public TDto ToDto<TEntity, TDto>(TEntity entity)
        {
            return _mapper.Map<TDto>(entity);
        }
    }
}