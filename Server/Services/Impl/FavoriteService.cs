using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Common;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class FavoriteService : IFavoriteService
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly EntityMapper _entityMapper;

        public FavoriteService(IFavoriteRepository favoriteRepository, EntityMapper entityMapper)
        {
            _favoriteRepository = favoriteRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<FavoriteDto>> GetAll()
        {
            var favorites = await _favoriteRepository.GetAll();
            
            var favoritesDto = new HashSet<FavoriteDto>();

            foreach (var favorite in favorites)
            {
                var favoriteDto = _entityMapper.ToDto<Favorite, FavoriteDto>(favorite);
                favoritesDto.Add(favoriteDto);
            }
            
            return favoritesDto.ToList();
        }

        public async Task<FavoriteDto> GetById(int id)
        {
            var favorite = await _favoriteRepository.GetById(id);
            
            return _entityMapper.ToDto<Favorite, FavoriteDto>(favorite);
        }

        public async Task<FavoriteDto> Create(FavoriteDto favoriteDto)
        {
            var favorite = _entityMapper.ToEntity<Favorite, FavoriteDto>(favoriteDto);

            var createdFavorite = await _favoriteRepository.Create(favorite);

            return _entityMapper.ToDto<Favorite, FavoriteDto>(createdFavorite);
        }

        public async Task<FavoriteDto> Update(int id, FavoriteDto favoriteDto)
        {
            var favorite = _entityMapper.ToEntity<Favorite, FavoriteDto>(favoriteDto);

            var updatedFavorite = await _favoriteRepository.Update(id, favorite);

            return _entityMapper.ToDto<Favorite, FavoriteDto>(updatedFavorite);
        }

        public Task<bool> Delete(int id)
        {
            return _favoriteRepository.Delete(id);
        }
    }
}