

import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_hospital_model.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_hospital_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_search_domain.dart';

import '../../../../core/error/exception.dart';
import '../../../../core/error/failures.dart';
import '../../../../core/network/network_info.dart';
import '../../domain/repositories/search_hospitals_repository.dart';
import '../datasources/hospital_remote_datasource.dart';

class HospitalSearchRepositoryImpl implements HospitalsSearchRepository {
  final HospitalSearchRemoteDataSource remoteDataSource;
  final NetworkInfo networkInfo;

  HospitalSearchRepositoryImpl({
    required this.remoteDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, List<InstitutionSearchDomain>>> searchByFilterHospitals(
      FilterHospitalDomain filterHospital) async {

    if (await networkInfo.isConnected) {
      try {
        FilterHospitalModel filterHospitalModel = FilterHospitalModel(activeFor: filterHospital.operationYears, openNow: filterHospital.openStatus, services: filterHospital.services);
        final remoteHospitals = await remoteDataSource
            .searchByFilterHospitals(filterHospitalModel);
        return Right(remoteHospitals);
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, List<InstitutionSearchDomain>>> searchByNameHospitals(
      String name) async {
    if (await networkInfo.isConnected) {
      try {
        final remoteHospitals = await remoteDataSource.searchByNameHospitals(name);
        return Right(remoteHospitals);
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, List<InstitutionSearchDomain>>> getAllHospitals() async {
    if (await networkInfo.isConnected) {
      try {
        final remoteHospitals = await remoteDataSource.getAllHospitals();
        return Right(remoteHospitals);
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }
}