import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_detail_domain.dart';

import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_doctor_domain.dart';

abstract class HospitalDetailRepository {
  Future<Either<Failure, InstitutionDetailDomain>> getHospitalDetail(
      String hospitalID);

  Future<Either<Failure, List<DoctorDomain>>> getFilteredDoctors(
      DoctorFilterDomain doctorFilterDomain);
}
