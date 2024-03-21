package com.packt.cardatabase.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import java.util.List;

public interface CarRepository extends CrudRepository<Car, Long>, PagingAndSortingRepository<Car, Long> {
    // Fetch cars by brand
    List<Car> findByBrand(String brand);

    // Fetch cars by model
    List<Car> findByModel(String model);

    // Fetch cars by model year
    List<Car> findByModelYear(int modelYear);

    // Fetch cars by brand and model
    List<Car> findByBrandAndModel(String brand, String model);

    // Fetch cars by brand and color
    List<Car> findByBrandAndColor(String brand, String color);

    // Fetch cars by brand and sort by model year
    List<Car> findByBrandOrderByModelYearAsc(String brand);

    // EXAMPLE OF SQL STATEMENTS USING THE @Query ANNOTATION
    // Fetch cars by brand using SQL
    //@Query("select c from Car c where c.brand = ?1")
    //List<Car> findByBrand(String brand);

    // Fetch cars by brand using SQL
    @Query("select c from Car c where c.brand like %?1")
    List<Car> findByBrandEndsWith(String brand);

}
