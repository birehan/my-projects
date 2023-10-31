
import 'package:get_it/get_it.dart';
import 'package:hakim_hub_mobile/features/hospital/data/repositories/hospital_detail_repository_impl.dart';

import '../features/hospital/data/datasources/hospital_detail_remote_datasource.dart';
import '../features/hospital/domain/repositories/hospital_detail_repository.dart';
import '../features/hospital/domain/usecases/get_doctor_by_filter.dart';
import '../features/hospital/domain/usecases/get_hospital_detail.dart';
import '../features/hospital/presentation/bloc/bloc/hospital_detail_bloc.dart';

Future<void> hospitalDetailsinit(GetIt sl) async {

  sl.registerFactory(() => HospitalDetailBloc(getDoctorByFilter: sl(), getHospitalDetail: sl()));


  // Use cases
  sl.registerFactory(() => GetDoctorByFilter(sl()));
  sl.registerFactory(() => GetHospitalDetail(sl()));


  // Repository
  sl.registerLazySingleton<HospitalDetailRepository >(
    () =>HospitalDetailRepositoryImpl(networkInfo: sl(), remoteDataSource: sl()));
    


  // Data sources
  
  sl.registerLazySingleton<HospitalDetailRemoteDataSource >(
    () => HospitalDetailRemoteDataSoureImpl(client: sl()),
  );
}