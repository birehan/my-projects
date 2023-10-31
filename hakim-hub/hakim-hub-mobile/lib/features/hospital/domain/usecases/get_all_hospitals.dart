

import 'package:dartz/dartz.dart';

import '../../../../core/error/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../entities/hospital_search_domain.dart';
import '../repositories/search_hospitals_repository.dart';

class GetAllHospitals implements UseCase<List<InstitutionSearchDomain>, NoParams> {
  final HospitalsSearchRepository repository;

  GetAllHospitals(this.repository);

  @override
  Future<Either<Failure, List<InstitutionSearchDomain>>> call(NoParams noParams) async {
    return await repository.getAllHospitals();
  }
}