using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Server.Dto;
using Server.Models;
using Server.Repositories;

namespace Server.Services.Impl
{
    public class FavoriteService : IFavoriteService
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly IMapper _entityMapper;

        public FavoriteService(IFavoriteRepository favoriteRepository, IMapper entityMapper)
        {
            _favoriteRepository = favoriteRepository;
            _entityMapper = entityMapper;
        }
        
        public async Task<List<FavoriteDto>> GetAll()
        {
            var favorites = await _favoriteRepository.GetAll();
            return GetFavoriteDtoList(favorites);
        }

        public async Task<FavoriteDto> GetById(int id)
        {
            var favorite = await _favoriteRepository.GetById(id);
            return GetFavoriteDto(favorite);
        }

        public Task<List<FavoriteDto>> GetByIds(List<int> ids)
        {
            throw new System.NotImplementedException();
        }

        public async Task<FavoriteDto> Create(FavoriteDto favoriteDto)
        {
            var favorite = _entityMapper.Map<Favorite>(favoriteDto);

            var createdFavorite = await _favoriteRepository.Create(favorite);

            return GetFavoriteDto(createdFavorite);
        }

        public async Task<FavoriteDto> Update(int id, FavoriteDto favoriteDto)
        {
            var favorite = _entityMapper.Map<Favorite>(favoriteDto);

            var updatedFavorite = await _favoriteRepository.Update(id, favorite);

            return GetFavoriteDto(updatedFavorite);
        }

        public Task<bool> Delete(int id)
        {
            return _favoriteRepository.Delete(id);
        }

        public List<FavoriteDto> GetByUserId(int userId)
        {
            var favorites = _favoriteRepository.GetByUserId(userId);
            return GetFavoriteDtoList(favorites);
        }

        public List<FavoriteDto> GetByClothesId(int clothesId)
        {
            var favorites = _favoriteRepository.GetByClothesId(clothesId);
            return GetFavoriteDtoList(favorites);
        }

        private FavoriteDto GetFavoriteDto(Favorite favorite)
        {
            return _entityMapper.Map<FavoriteDto>(favorite);
        }

        private List<FavoriteDto> GetFavoriteDtoList(List<Favorite> favorites)
        {
            return favorites.Select(GetFavoriteDto).ToList();
        }
    }
}