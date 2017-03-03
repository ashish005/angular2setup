import { PageNotFound } from './page-not-found'
import { FilterTextComponent } from './filter-text.directive'
import { ModalPopupModule, ModalPlaceholderComponent } from './model-popup.service';
import { UtilService } from './util.service';

export const COMMON_MODULES = [ ModalPopupModule];
export const COMMON_DIRECTIVE = [ FilterTextComponent];
export const COMMON_SERVICE = [ UtilService ];

export { PageNotFound };