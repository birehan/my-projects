import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/search_doctors_bloc/search_doctors_event.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/search_doctors_bloc/search_doctors_state.dart';

class SearchBarBloc extends Bloc<SearchBarEvent, SearchBarState> {
  final List<DoctorDomain> doctors;

  SearchBarBloc(this.doctors) : super(SearchInitial(doctors)) {
    on<SearchChanged>((event, emit) async {
      try {
        final filteredDoctors = _runFilter(event.searchWord, doctors);
        emit(SearchSuccess(filteredDoctors));
      } catch (e) {
        emit(SearchError(e.toString(), doctors));
      }
    });
    on<SearchSubmitted>((event, emit) async {
      try {
        final filteredDoctors = _runFilter(event.searchWord, doctors);
        emit(SearchSuccess(filteredDoctors));
      } catch (e) {
        emit(SearchError(e.toString(), doctors));
      }
    });
  }

  List<DoctorDomain> _runFilter(String searchWord, List<DoctorDomain> doctors) {
    if (searchWord.isEmpty) {
      return doctors;
    }
    return doctors
        .where((doctor) =>
            doctor.fullName.toLowerCase().contains(searchWord.toLowerCase()) ||
            doctor.specialities.any((speciality) =>
                speciality.toLowerCase().contains(searchWord.toLowerCase())))
        .toList();
  }
}
