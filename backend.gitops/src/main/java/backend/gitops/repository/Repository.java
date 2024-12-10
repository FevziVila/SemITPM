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
          { "wildcard": { "name": { "value": "?0*" } } },
          { "wildcard": { "symbol": { "value": "?0*" } } }
        ],
        "minimum_should_match": 1
      }
    }
    """)
    List<StockModel> findByNameOrSymbol(String searchTerm);
}
