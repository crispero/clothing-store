using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Common;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class BasketService : IBasketService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly EntityMapper _entityMapper;

        public BasketService(IBasketRepository basketRepository, EntityMapper entityMapper)
        {
            _basketRepository = basketRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<BasketDto>> GetAll()
        {
            var baskets = await _basketRepository.GetAll();
            
            var basketsDto = new HashSet<BasketDto>();

            foreach (var basket in baskets)
            {
                var basketDto = _entityMapper.ToDto<Basket, BasketDto>(basket);
                basketsDto.Add(basketDto);
            }
            
            return basketsDto.ToList();
        }

        public async Task<BasketDto> GetById(int id)
        {
            var basket = await _basketRepository.GetById(id);
            
            return _entityMapper.ToDto<Basket, BasketDto>(basket);
        }

        public async Task<BasketDto> Create(BasketDto basketDto)
        {
            var basket = _entityMapper.ToEntity<Basket, BasketDto>(basketDto);

            var createdBasket = await _basketRepository.Create(basket);

            return _entityMapper.ToDto<Basket, BasketDto>(createdBasket);
        }

        public async Task<BasketDto> Update(int id, BasketDto basketDto)
        {
            var basket = _entityMapper.ToEntity<Basket, BasketDto>(basketDto);

            var updatedBasket = await _basketRepository.Update(id, basket);

            return _entityMapper.ToDto<Basket, BasketDto>(updatedBasket);
        }

        public Task<bool> Delete(int id)
        {
            return _basketRepository.Delete(id);
        }
    }
}