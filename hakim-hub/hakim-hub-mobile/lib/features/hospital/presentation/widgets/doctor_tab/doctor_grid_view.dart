// Importing necessary dependencies
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/core/utils/pixle_to_percent.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/search_doctors_bloc/search_doctors_bloc.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/search_doctors_bloc/search_doctors_event.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/bloc/search_doctors_bloc/search_doctors_state.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/widgets/doctor_tab/doctor_card.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

// Importing dependencies from parent directories
import '../../../../../core/utils/colors.dart';
import '../../../../../router/routes.dart';
import '../../../domain/entities/filter_doctor_domain.dart';
import 'doctor_filter_page.dart';

class DoctorGridView extends StatefulWidget {
  List<String> filterList; // A list of doctors
  final String institutionId; // The ID of the hospital
  Function
      onFilterChanged; // A function to be called when the filters are changed
  List<DoctorDomain> doctors; // A list of doctors to display
  DoctorGridView({
    Key? key,
    required this.doctors,
    required this.filterList,
    required this.onFilterChanged,
    required this.institutionId,
  }) : super(key: key);

  @override
  State<DoctorGridView> createState() => _DoctorGridViewState();
}

class _DoctorGridViewState extends State<DoctorGridView> {
  late List<DoctorDomain> _filteredDoctors;

  @override
  void initState() {
    super.initState();
    _filteredDoctors = widget.doctors;
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => SearchBarBloc(_filteredDoctors),
      child: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: pixleToPercent(10, "width").w,
          vertical: pixleToPercent(20, "height").h,
        ),
        child: GestureDetector(
          onTap: () => FocusScope.of(context).unfocus(),
          behavior: HitTestBehavior.translucent,
          child: FocusScope(
            child: Column(
              children: [
                BlocBuilder<SearchBarBloc, SearchBarState>(
                  builder: (context, state) {
                    return Form(
                      child: SizedBox(
                        width: pixleToPercent(370, "width").w,
                        height: pixleToPercent(48, "height").h,
                        child: TextFormField(
                          onChanged: (value) => context
                              .read<SearchBarBloc>()
                              .add(SearchChanged(value)),
                          onFieldSubmitted: (value) => context
                              .read<SearchBarBloc>()
                              .add(SearchSubmitted(value)),
                          decoration: InputDecoration(
                            hintText: "Search Doctor or Speciality",
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            prefixIcon: search,
                            suffixIcon: GestureDetector(
                              child: filter,
                              onTap: () async {
                                DoctorFilterDomain doctorFilterDomain =
                                    (await showModalBottomSheet<
                                        DoctorFilterDomain>(
                                  isScrollControlled: true,
                                  backgroundColor: titleTextColor,
                                  context: context,
                                  builder: (BuildContext context) {
                                    return DoctorFilterPage(
                                      filterList: widget.filterList,
                                      institutionId: widget.institutionId,
                                    );
                                  },
                                ))!;
                                widget.onFilterChanged(doctorFilterDomain);
                              },
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
                SizedBox(
                  height: pixleToPercent(20, "height").h,
                ),
                Expanded(
                  child: BlocBuilder<SearchBarBloc, SearchBarState>(
                    builder: (context, state) {
                      return GridView.builder(
                        physics: BouncingScrollPhysics(),
                        itemCount: state.filteredDoctors.length,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: pixleToPercent(17.78, "width").w,
                          mainAxisSpacing: pixleToPercent(28.31, "height").h,
                          childAspectRatio: pixleToPercent(179.22, "width").w /
                              pixleToPercent(139.69, "height").h,
                        ),
                        itemBuilder: (BuildContext context, int index) {
                          final doctor = state.filteredDoctors[index];
                          return GestureDetector(
                            child: DoctorCard(
                              imageUrl: doctor.photoUrl,
                              title: doctor.fullName,
                              subtitle: doctor.specialities.join(", "),
                            ),
                            onTap: () {
                              context.pushNamed(
                                AppRoutes.DoctorDetailPage,
                                queryParameters: {"id": doctor.id},
                              );
                            },
                          );
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
