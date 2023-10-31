import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/widgets/hospital_page_widgets/filter_page.dart';

import '../utils/colors.dart';
import '../utils/icons.dart';
import '../utils/ui_converter.dart';

class CSFFormField extends StatefulWidget {
  final String hintText;
  final Function onChanged;
  final bool obscureText;
  final TextEditingController controller;
  final Key? formkey;
  String? fieldName;

  CSFFormField({
    Key? key,
    required this.hintText,
    required this.onChanged,
    required this.obscureText,
    required this.controller,
    this.formkey,
    this.fieldName,
  }) : super(key: key);

  @override
  _CSFFormFieldState createState() => _CSFFormFieldState();
}

class _CSFFormFieldState extends State<CSFFormField> {
  String? errorText;

  @override
  Widget build(BuildContext context) {
    return FormField(
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
              hintStyle: const TextStyle(color: searchHintColor),
              // hintText: "Search hospitals",
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              errorText: errorText,
              prefixIcon: search,
              suffixIcon: Container(
                  child: GestureDetector(
                child: Icon(Icons.filter_list_outlined),
                onTap: () {
                  showModalBottomSheet(
                    isScrollControlled: true,
                    backgroundColor: titleTextColor,
                    context: context,
                    builder: (BuildContext context) {
                      return FilterPage(
                        filterList: [],
                      );
                    },
                  );
                },
              ))),
          onTap: () {
            setState(() {
              errorText = null;
            });
          },
        )
            // TextField(
            //   obscureText: widget.obscureText,
            //   key: widget.formkey,
            //   controller: widget.controller,
            //   decoration: InputDecoration(

            //       constraints: BoxConstraints(

            //           minHeight: UIConverter.getComponentHeight(context, 48),
            //           minWidth: UIConverter.getComponentWidth(context, 370),
            //           maxHeight: UIConverter.getComponentHeight(context, 48),
            //           maxWidth: UIConverter.getComponentWidth(context, 370),
            //            ),
            //       hintStyle: const TextStyle(color: Colors.black26),
            //       hintText: widget.hintText,
            //       border: OutlineInputBorder(
            //         borderRadius: BorderRadius.circular(10),
            //       ),
            //       errorText: errorText,
            //       prefixIcon: search,
            //       suffixIcon: const Icon(Icons.filter_list_outlined)
            //       ),
            //   onChanged: (value) {
            //     setState(() {
            //       errorText = null;
            //     });
            //     widget.onChanged(value);
            //   },
            // )
            ;
      },
      validator: (value) {
        if (value == null) {
          setState(() {
            errorText = ' This ${widget.fieldName} field is required';
          });
          return '';
        }
        return null;
      },
    );
  }
}
