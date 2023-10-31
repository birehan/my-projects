import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_hospital_domain.dart';

import '../../../../core/error/failures.dart';
import 'package:dartz/dartz.dart';

import '../entities/hospital_search_domain.dart';


abstract class HospitalsSearchRepository {
  Future<Either<Failure, List<InstitutionSearchDomain>>> searchByFilterHospitals(
      FilterHospitalDomain filterHospitalDomain);

  Future<Either<Failure, List<InstitutionSearchDomain>>> searchByNameHospitals(
      String name);
  Future<Either<Failure, List<InstitutionSearchDomain>>> getAllHospitals();
}