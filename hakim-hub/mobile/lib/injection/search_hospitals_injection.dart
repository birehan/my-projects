
import 'package:get_it/get_it.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/repositories/search_hospitals_repository.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/usecases/get_hospitals_by_filter.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';
import 'package:http/http.dart' as http;


import '../core/network/network_info.dart';
import '../features/hospital/data/datasources/hospital_remote_datasource.dart';
import '../features/hospital/data/repositories/hospital_repository_impl.dart';
import '../features/hospital/domain/usecases/get_all_hospitals.dart';
import '../features/hospital/domain/usecases/get_hospitals_by_name.dart';
import '../features/hospital/presentation/bloc/bloc/search_hospital_bloc.dart';



Future<void> searchHospitalsinit(GetIt sl) async {

  sl.registerFactory(() => SearchHospitalBloc(getHospitalsByFilter: sl(), getHospitalsByName: sl(), getAllHospitals: sl()));


  // Use cases
  sl.registerFactory(() => GetHospitalsByFilter(sl()));
  sl.registerFactory(() => GetHospitalsByName(sl()));
  sl.registerFactory(() => GetAllHospitals(sl()));


  // Repository
  sl.registerLazySingleton<HospitalsSearchRepository>(
    () =>HospitalSearchRepositoryImpl(networkInfo: sl(), remoteDataSource: sl()));
    


  // Data sources
  
  sl.registerLazySingleton<HospitalSearchRemoteDataSource>(
    () => HospitalSearchRemoteDataSourceImpl(client: sl()),
  );


  // Core
  sl.registerLazySingleton<NetworkInfo>(() => NetworkInfoImpl(sl()));

  // External
  sl.registerLazySingleton(() => http.Client());
  sl.registerLazySingleton(() => InternetConnectionChecker());
}