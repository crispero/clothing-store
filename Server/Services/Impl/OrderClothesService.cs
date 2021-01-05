using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class OrderClothesService : IOrderClothesService
    {
        private readonly IOrderClothesRepository _orderClothesRepository;
        private readonly IMapper _entityMapper;

        public OrderClothesService(IOrderClothesRepository orderClothesRepository, IMapper entityMapper)
        {
            _orderClothesRepository = orderClothesRepository;
            _entityMapper = entityMapper;
        }
        
        public Task<List<OrderXClothesDto>> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public Task<OrderXClothesDto> GetById(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<OrderXClothesDto>> GetByIds(List<int> ids)
        {
            var orderXClotheses = await _orderClothesRepository.GetByIds(ids);
            return GetOrderXClothesDtos(orderXClotheses);
        }

        public async Task<List<OrderXClothesDto>> GetByOrderId(int orderId)
        {
            var orderXClotheses = await _orderClothesRepository.GetByOrderId(orderId);
            return GetOrderXClothesDtos(orderXClotheses);
        }

        public async Task<OrderXClothesDto> Create(OrderXClothesDto entity)
        {
            var orderXClothes = _entityMapper.Map<OrderXClothes>(entity);
            var createdOrderXClothes = await _orderClothesRepository.Create(orderXClothes);
            return GetOrderXClothesDto(createdOrderXClothes);
        }

        public Task<OrderXClothesDto> Update(int id, OrderXClothesDto entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            return _orderClothesRepository.Delete(id);
        }
        
        private OrderXClothesDto GetOrderXClothesDto(OrderXClothes orderXClothes)
        {
            return _entityMapper.Map<OrderXClothesDto>(orderXClothes);
        }

        private List<OrderXClothesDto> GetOrderXClothesDtos(List<OrderXClothes> orderXClotheses)
        {
            return orderXClotheses.Select(GetOrderXClothesDto).ToList();
        }
    }
}