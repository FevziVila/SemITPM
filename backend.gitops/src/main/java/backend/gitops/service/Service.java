package backend.gitops.service;
import java.util.List;

import backend.gitops.repository.Repository;
import backend.gitops.stock.StockModel;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@org.springframework.stereotype.Service
public class Service {
    
    private final Repository repository;

    public  List<StockModel> returnTickers(String args) {
        if (args == null) {
            throw new NullPointerException();
        }
        return repository.findByNameOrSymbol(args);
    }
}
