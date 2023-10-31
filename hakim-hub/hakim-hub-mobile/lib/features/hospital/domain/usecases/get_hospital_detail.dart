import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/core/usecases/usecase.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_detail_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/repositories/hospital_detail_repository.dart';

class GetHospitalDetail implements UseCase<InstitutionDetailDomain, String> {
  final HospitalDetailRepository repository;

  GetHospitalDetail(this.repository);

  @override
  Future<Either<Failure, InstitutionDetailDomain>> call(
      String hospitalId) async {
    return await repository.getHospitalDetail(hospitalId);
  }
}
