package backend.gitops.repository;

import java.util.List;

import backend.gitops.stock.StockModel;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


public interface Repository extends ElasticsearchRepository<StockModel, String>{
    
    @Query("""
    {
      "bool": {
        "should": [
          { "match": { "name": "?0" } },
          { "match": { "symbol": "?0" } }
        ],
        "minimum_should_match": 1
      }
    }
    """)
    List<StockModel> findByNameOrSymbol(String searchTerm);
}
