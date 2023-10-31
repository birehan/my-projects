import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;
import 'package:hakim_hub_mobile/features/doctor/data/datasources/doctor_detail_remote_datasource.dart';
import 'package:hakim_hub_mobile/features/doctor/data/repositories/doctor_detail_repository_impl.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/repositories/doctor_detail_repository.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/usecases/doctor_detail_usecase.dart';
import 'package:hakim_hub_mobile/features/doctor/presentation/bloc/doctor_detail_bloc.dart';


Future<void> doctorDetailInit(GetIt sl) async {
  // Bloc
  sl.registerFactory(
    () => DoctorDetailBloc(
      getDoctorDetail: sl(),
    ),
  );

  // usecases
  sl.registerLazySingleton(
    () => GetDoctorDetail(
      doctorDetailRepository: sl(),
    ),
  );

  // Repositories
  sl.registerLazySingleton<DoctorDetailRepository>(
    () => DoctorDetailRepositoryImpl(
      remoteDataSource: sl(),
    ),
  );

  // Data Sources
  sl.registerLazySingleton<DoctorDetailRemoteDataSource>(
    () => DoctorDetailRemoteDataSourceImpl(
      client: sl(),
    ),
  );

}
