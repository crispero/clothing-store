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
            return getOrderXClothesDtos(orderXClotheses);
        }

        public async Task<List<OrderXClothesDto>> GetByOrderId(int orderId)
        {
            var orderXClotheses = await _orderClothesRepository.GetByOrderId(orderId);
            return getOrderXClothesDtos(orderXClotheses);
        }

        public Task<OrderXClothesDto> Create(OrderXClothesDto entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<OrderXClothesDto> Update(int id, OrderXClothesDto entity)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new System.NotImplementedException();
        }
        
        private OrderXClothesDto getOrderXClothesDto(OrderXClothes orderXClothes)
        {
            return _entityMapper.Map<OrderXClothesDto>(orderXClothes);
        }

        private List<OrderXClothesDto> getOrderXClothesDtos(List<OrderXClothes> orderXClotheses)
        {
            return orderXClotheses.Select(getOrderXClothesDto).ToList();
        }
    }
}