import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/core/network/network_info.dart';
import 'package:hakim_hub_mobile/features/hospital/data/datasources/hospital_detail_remote_datasource.dart';
import 'package:hakim_hub_mobile/features/hospital/data/models/filter_doctors_model.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_detail_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/repositories/hospital_detail_repository.dart';

class HospitalDetailRepositoryImpl implements HospitalDetailRepository {
  final HospitalDetailRemoteDataSource remoteDataSource;
  final NetworkInfo networkInfo;

  HospitalDetailRepositoryImpl({
    required this.remoteDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, InstitutionDetailDomain>> getHospitalDetail(
      String hospitalID) async {
    if (await networkInfo.isConnected) {
      try {
        final hospitalDetail =
            await remoteDataSource.getHospitalDetail(hospitalID);
        return Right(hospitalDetail);
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, List<DoctorDomain>>> getFilteredDoctors(
      DoctorFilterDomain doctorFilterDomain) async {
    if (await networkInfo.isConnected) {
      try {
        DoctorFilterModel doctorfilterModel = DoctorFilterModel(
            institutionId: doctorFilterDomain.institutionId,
            experienceYears: doctorFilterDomain.experienceYears,
            educationalName: doctorFilterDomain.educationalName,
            specialities: doctorFilterDomain.specialities);
        final hospitalDetail =
            await remoteDataSource.getDoctorByFilter(doctorfilterModel);
        return Right(hospitalDetail);
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }
}
