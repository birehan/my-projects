import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/core/usecases/usecase.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/repositories/hospital_detail_repository.dart';

class GetDoctorByFilter
    implements UseCase<List<DoctorDomain>, DoctorFilterDomain> {
  final HospitalDetailRepository repository;

  GetDoctorByFilter(this.repository);

  @override
  Future<Either<Failure, List<DoctorDomain>>> call(
      DoctorFilterDomain params) async {
    return await repository.getFilteredDoctors(params);
  }
}
