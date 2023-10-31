import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:hakim_hub_mobile/core/usecases/usecase.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/usecases/get_hospitals_by_name.dart';

import '../../../domain/entities/filter_hospital_domain.dart';
import '../../../domain/entities/hospital_search_domain.dart';
import '../../../domain/usecases/get_all_hospitals.dart';
import '../../../domain/usecases/get_hospitals_by_filter.dart';

part 'search_hospital_event.dart';
part 'search_hospital_state.dart';

class SearchHospitalBloc
    extends Bloc<SearchHospitalEvent, SearchHospitalState> {
  final GetHospitalsByFilter getHospitalsByFilter;
  final GetHospitalsByName getHospitalsByName;
  final GetAllHospitals getAllHospitals;
  SearchHospitalBloc(
      {required this.getHospitalsByFilter,
      required this.getHospitalsByName,
      required this.getAllHospitals})
      : super(SearchHospitalInitial()) {
    on<SearchHospitalEvent>((event, emit) {
      // TODO: implement event handler
    });

    on<HospitalSearchByFilterEvent>((event, emit) async {
      emit(SearchHospitalLoading());
      await getHospitalsByFilter(event.filter).then((value) {
        value.fold((l) => emit(SearchHospitalError(message: l.toString())),
            (r) => emit(SearchHospitalSuccess(institutionSearchDomain: r)));
      });
    });

    on<HospitalSearchByNameEvent>((event, emit) async {
      emit(SearchHospitalLoading());
      await getHospitalsByName(event.name).then((value) {
        value.fold((l) => emit(SearchHospitalError(message: l.toString())),
            (r) => emit(SearchHospitalSuccess(institutionSearchDomain: r)));
      });
    });

    on<GetAllHospitalsEvent>((event, emit) async {
      emit(SearchHospitalLoading());
      await getAllHospitals(NoParams()).then((value) {
        value.fold((l) {
          return emit(SearchHospitalError(message: l.toString()));
        }, (r) {
          return emit(SearchHospitalSuccess(institutionSearchDomain: r));
        });
      });
    });
  }
}
