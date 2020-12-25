using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class BasketService : IBasketService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _entityMapper;

        public BasketService(IBasketRepository basketRepository, IMapper entityMapper)
        {
            _basketRepository = basketRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<BasketDto>> GetAll()
        {
            var baskets = await _basketRepository.GetAll();
            return GetBasketDtoList(baskets);
        }

        public async Task<BasketDto> GetById(int id)
        {
            var basket = await _basketRepository.GetById(id);
            
            return GetBasketDto(basket);
        }

        public Task<List<BasketDto>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<BasketDto> Create(BasketDto basketDto)
        {
            var basket = _entityMapper.Map<Basket>(basketDto);

            var createdBasket = await _basketRepository.Create(basket);

            return GetBasketDto(createdBasket);
        }

        public async Task<BasketDto> Update(int id, BasketDto basketDto)
        {
            var basket = _entityMapper.Map<Basket>(basketDto);

            var updatedBasket = await _basketRepository.Update(id, basket);

            return GetBasketDto(updatedBasket);
        }

        public Task<bool> Delete(int id)
        {
            return _basketRepository.Delete(id);
        }

        public async Task<List<BasketDto>> GetByUserId(int userId)
        {
            var favorites = await _basketRepository.GetByUserId(userId);
            return GetBasketDtoList(favorites);
        }
        
        private BasketDto GetBasketDto(Basket basket)
        {
            return _entityMapper.Map<BasketDto>(basket);
        }

        private List<BasketDto> GetBasketDtoList(List<Basket> basketList)
        {
            return basketList.Select(GetBasketDto).ToList();
        }
    }
}