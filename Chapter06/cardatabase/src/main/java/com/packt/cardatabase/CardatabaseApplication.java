package com.packt.cardatabase;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;

import com.packt.cardatabase.domain.AppUser;
import com.packt.cardatabase.domain.AppUserRepository;
import com.packt.cardatabase.domain.Car;
import com.packt.cardatabase.domain.CarRepository;
import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.domain.OwnerRepository;
import java.util.Arrays;

@SpringBootApplication
public class CardatabaseApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(CardatabaseApplication.class);
	private final CarRepository carRepository;
	private final OwnerRepository ownerRepository;
	private final AppUserRepository appUserRepository;

	public CardatabaseApplication(CarRepository carRepository, OwnerRepository ownerRepository, AppUserRepository appUserRepository) {
		this.carRepository = carRepository;
		this.ownerRepository = ownerRepository;
		this.appUserRepository = appUserRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(CardatabaseApplication.class, args);
		logger.info("Hoof hearted!");
	}

	@SuppressWarnings("null")
	@Override
	public void run(String... args) throws Exception {
		Owner owner1 = new Owner("Scott", "Johnson");
		Owner owner2 = new Owner("Mary", "Robinson");
		ownerRepository.saveAll(Arrays.asList(owner1, owner2));
		carRepository.save(new Car("Ford", "Mustang", "Red","ADF-1121",2023, 59000, owner1));
		carRepository.save(new Car("Nissan", "Leaf", "White","SSJ-3002",2020, 29000, owner2));
		carRepository.save(new Car("Toyota", "Prius", "Silver","KKO-0212",2022, 39000, owner2));

		for (Car car : carRepository.findAll()) {
			logger.info("brand: {}, model: {}", car.getBrand(), car.getModel());
		}

		appUserRepository.save(new AppUser("user", "$2a$12$SLIgRBZSgD/BaTYPsGsUK.jrosWNMSMq72fUo9Rgrhu5BPvE02GS2", "USER"));
		appUserRepository.save(new AppUser("admin", "$2a$12$rphXWRgUMxb2n1I7nV9KSuDzqvv.LCsaY.8Semx1L49T.QalNYcva", "ADMIN"));
	}

}
