import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_hospital_domain.dart';

import '../../../../../core/utils/colors.dart';
import '../../../../../core/utils/icons.dart';
import '../../../../../core/utils/ui_converter.dart';
import '../../../data/models/filter_hospital_model.dart';
import 'filter_page.dart';

class HospitalSearchField extends StatefulWidget {
  final String hintText;
  final Function onChanged;
  final bool obscureText;
  final TextEditingController controller;
  final Function onFilterChanged;
  final bool enabled;
  String? fieldName;
  String? errorValue;
  List<String> filterList;

  HospitalSearchField(
      {required this.filterList,
      Key? key,
      required this.hintText,
      required this.onChanged,
      required this.obscureText,
      required this.controller,
      this.fieldName,
      required this.onFilterChanged,
      required this.enabled})
      : super(key: key);

  @override
  _HospitalSearchFieldState createState() => _HospitalSearchFieldState();
}

class _HospitalSearchFieldState extends State<HospitalSearchField> {
  String? errorText;
  GlobalKey<FormFieldState> formkey = GlobalKey<FormFieldState>();
  @override
  Widget build(BuildContext context) {
    return FormField(
      key: formkey,
      builder: (FormFieldState state) {
        return TextFormField(
          obscureText: false,
          controller: widget.controller,
          decoration: InputDecoration(
              constraints: BoxConstraints(
                minHeight: UIConverter.getComponentHeight(context, 48),
                minWidth: UIConverter.getComponentWidth(context, 370),
                maxHeight: UIConverter.getComponentHeight(context, 48),
                maxWidth: UIConverter.getComponentWidth(context, 370),
              ),
              hintStyle: const TextStyle(color: Colors.blue),
              // hintText: "Search hospitals",
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              prefixIcon: search,
              suffixIcon: Container(
                  child: GestureDetector(
                child: filter,
                onTap: () async {
                  FilterHospitalDomain filterHospitalDomain =
                      (await showModalBottomSheet<FilterHospitalDomain>(
                    isScrollControlled: true,
                    backgroundColor: titleTextColor,
                    context: context,
                    builder: (BuildContext context) {
                      return FilterPage(filterList: widget.filterList);
                    },
                  ))!;

                  widget.onFilterChanged(filterHospitalDomain);
                },
              ))),
          onFieldSubmitted: (sth) {
            if (formkey.currentState!.validate()) {
              widget.onChanged(widget.controller.text);
            } else {}
          },
        );
      },
    );
  }
}
