using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderClothesService _orderClothesService;
        private readonly IMapper _entityMapper;

        public OrderService(IOrderRepository orderRepository, IMapper entityMapper, IOrderClothesService orderClothesService)
        {
            _orderRepository = orderRepository;
            _orderClothesService = orderClothesService;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<OrderDto>> GetAll()
        {
            var orders = await _orderRepository.GetAll();
            return await GetOrderDtoList(orders);
        }

        public async Task<OrderDto> GetById(int id)
        {
            var order = await _orderRepository.GetById(id);
            return await GetOrderDto(order);
        }

        public Task<List<OrderDto>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<OrderDto> Create(OrderDto orderDto)
        {
            await CreateOrderXClothes(orderDto);
            
            var order = _entityMapper.Map<Order>(orderDto);

            var createdOrder = await _orderRepository.Create(order);

            return await GetOrderDto(createdOrder);
        }

        public async Task<OrderDto> Update(int id, OrderDto orderDto)
        {
            var order = _entityMapper.Map<Order>(orderDto);

            var updatedOrder = await _orderRepository.Update(id, order);

            return await GetOrderDto(updatedOrder);
        }

        public Task<bool> Delete(int id)
        {
            return _orderRepository.Delete(id);
        }

        public async Task<List<OrderDto>> GetByUserId(int userId)
        {
            var orders = await _orderRepository.GetByUserId(userId);
            return await GetOrderDtoList(orders);
        }
        
        private async Task<OrderDto> GetOrderDto(Order order)
        {
            var orderXClotheses = await _orderClothesService.GetByOrderId(order.OrderId);

            var clothesIds = new HashSet<int>();
            
            foreach (var orderXClothes in orderXClotheses)
            {
                clothesIds.Add(orderXClothes.ClothesId);
            }
            
            var orderDto = _entityMapper.Map<OrderDto>(order);

            orderDto.ClothesIds = clothesIds.ToList();

            return orderDto;
        }

        private async Task<List<OrderDto>> GetOrderDtoList(List<Order> orders)
        {
            var orderDtos = new HashSet<OrderDto>();
            
            foreach (var order in orders)
            {
                var orderDto = await GetOrderDto(order);
                orderDtos.Add(orderDto);
            }
            
            return orderDtos.ToList();
        }

        private async Task CreateOrderXClothes(OrderDto orderDto)
        {
            foreach (var clothesId in orderDto.ClothesIds)
            {
                var orderXClothes = new OrderXClothesDto
                {
                    OrderId = orderDto.OrderId,
                    ClothesId = clothesId
                };

                await _orderClothesService.Create(orderXClothes);
            }
        }
    }
}