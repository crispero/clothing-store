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
        private readonly IBasketService _basketService;
        private readonly IFavoriteService _favoriteService;
        private readonly IClothesService _clothesService;
        private readonly IMapper _entityMapper;

        public OrderService(
            IOrderRepository orderRepository,
            IMapper entityMapper,
            IOrderClothesService orderClothesService,
            IBasketService basketService,
            IFavoriteService favoriteService,
            IClothesService clothesService)
        {
            _orderRepository = orderRepository;
            _orderClothesService = orderClothesService;
            _entityMapper = entityMapper;
            _basketService = basketService;
            _favoriteService = favoriteService;
            _clothesService = clothesService;
        }
        
        public async Task<List<OrderDto>> GetAll()
        {
            var orders = await _orderRepository.GetAll();
            return GetOrderDtoList(orders);
        }

        public async Task<OrderDto> GetById(int id)
        {
            var order = await _orderRepository.GetById(id);
            return GetOrderDto(order);
        }

        public Task<List<OrderDto>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<OrderDto> Create(OrderDto orderDto)
        {
            var order = _entityMapper.Map<Order>(orderDto);

            var createdOrder = await _orderRepository.Create(order);

            foreach (var clothesId in orderDto.ClothesIds)
            {
                await CreateOrderXClothes(createdOrder.OrderId, clothesId);
                
                await RemoveFromBasket(clothesId);

                await RemoveFromFavorite(clothesId);
                
                await SetOrderedClothes(clothesId, true);
            }

            return GetOrderDto(createdOrder);
        }

        public async Task<OrderDto> Update(int id, OrderDto orderDto)
        {
            var order = _entityMapper.Map<Order>(orderDto);

            var updatedOrder = await _orderRepository.Update(id, order);

            return GetOrderDto(updatedOrder);
        }

        public async Task<bool> Delete(int id)
        {
            var order = await _orderRepository.GetById(id);

            var orderXClothesList = _orderClothesService.GetByOrderId(order.OrderId);

            foreach (var orderXClothesDto in orderXClothesList)
            {
                await SetOrderedClothes(orderXClothesDto.ClothesId, false);
            }
            
            return await _orderRepository.Delete(id);
        }

        public List<OrderDto> GetByUserId(int userId)
        {
            var orders = _orderRepository.GetByUserId(userId);
            return GetOrderDtoList(orders);
        }
        
        private OrderDto GetOrderDto(Order order)
        {
            var orderXClotheses = _orderClothesService.GetByOrderId(order.OrderId);

            var clothesIds = new HashSet<int>();
            
            foreach (var orderXClothes in orderXClotheses)
            {
                clothesIds.Add(orderXClothes.ClothesId);
            }
            
            var orderDto = _entityMapper.Map<OrderDto>(order);

            orderDto.ClothesIds = clothesIds.ToList();

            return orderDto;
        }

        private List<OrderDto> GetOrderDtoList(List<Order> orders)
        {
            var orderDtos = new HashSet<OrderDto>();
            
            foreach (var order in orders)
            {
                var orderDto = GetOrderDto(order);
                orderDtos.Add(orderDto);
            }
            
            return orderDtos.ToList();
        }

        private async Task CreateOrderXClothes(int orderId, int clothesId)
        {
            var orderXClothes = new OrderXClothesDto
            {
                OrderId = orderId,
                ClothesId = clothesId
            };

            await _orderClothesService.Create(orderXClothes);
        }

        private async Task RemoveFromBasket(int clothesId)
        {
            var basketsByClothesId = _basketService.GetByClothesId(clothesId);

            foreach (var basket in basketsByClothesId)
            {
                await _basketService.Delete(basket.BasketId);
            }
        }

        private async Task RemoveFromFavorite(int clothesId)
        {
            var favoritesByClothesId = _favoriteService.GetByClothesId(clothesId);

            foreach (var favorite in favoritesByClothesId)
            {
                await _favoriteService.Delete(favorite.FavoriteId);
            }
        }

        private async Task SetOrderedClothes(int clothesId, bool isOrdered)
        {
            var clothes = await _clothesService.GetById(clothesId);
            clothes.IsOrdered = isOrdered;
            await _clothesService.Update(clothesId, clothes);
        }
    }
}