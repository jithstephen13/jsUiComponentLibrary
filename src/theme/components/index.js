import button from './button';
import checkbox from './checkbox';
import TimelineStyle from '../../custom-components/timeline/TimelineStyle';
import TableStyles from '../../custom-components/CustomTable/TableStyles';
import TextInputStyle from '../../custom-components/text-input/TextInputStyles';
import ErrorTextStyle from '../../custom-components/error-text/ErrorTextStyle';
import AccordionStyle from '../../custom-components/accordion-view/AccordionStyle';
import BreadcrumbComponent from '../../custom-components/breadcrumb/BreadStyle';
import SelectStyle from '../../custom-components/dropdown-select/DropdownStyle';
import ToggleSwitch from '../../custom-components/toggle-switch/ToggleStyle';
import FileUploadStyle from '../../custom-components/file-upload/fileUploadStyle';
import DatePickerStyle from '../../custom-components/date-picker/Style';
import FormLabelStyle from '../../custom-components/form-label/FormLabelStyle';
import FormTitleStyle from '../../custom-components/form-title/formTitileStyle';
import CardStyle from '../../custom-components/card-view/style';
import ToggleSwitchNew from '../../custom-components/toggle-switch-new/style';
import PaginationStyles from '../../custom-components/Pagination/PaginationStyles';
import TextAreaStyles from '../../custom-components/TextArea/TextAreaStyles';
import RadioStyles from '../../custom-components/RadioButton/RadioStyles';
import FormModalStyle from '../../custom-components/form-modal/FormModalStyle';
import SideMenuStyle from '../../custom-components/sidemenu/sideMenuStyle';
import GeneralMenuStyle from '../../custom-components/GeneralMenu/GeneralMenuStyle';
import ExpandableCardStyle from '../../custom-components/expandable-card/style';
import VideoRecorderStyle from '../../custom-components/video-recorder/style';
import MapStyle from '../../custom-components/location-map/mapStyle';
import AudioRecorderStyle from '../../custom-components/audio-recorder/AudioRecorderStyle';
import ImageCaptureStyle from '../../custom-components/image-capture/ImageCaptureStyle';
import RichTextStyle from '../../custom-components/rich-text/RichTextStyle';
import GeneralFeaturesMenuStyle from '../../custom-components/GeneralFeaturesMenu/GeneralFeaturesMenuStyle';
import AlertStyle from '../../custom-components/alert/AlertStyle';
import MoreActionStyle from '../../custom-components/more-actions/MenuStyles';
import InfoPageStyle from '../../custom-components/info-pages/style';
import TabStyle from '../../custom-components/custom-tabs/style';
import TabVariant from '../../custom-components/custom-tabs/variant';
import ChartStyle from '../../custom-components/charts/style';
import PdfStyle from '../../custom-components/PdfViewer/PdfStyle';
import RichLabelStyle from '../../custom-components/rich-text/RichLabelStyle';
import FeedbackRatingStyle from '../../custom-components/feedback-rating/FeedbackRatingStyle';
import SelectableCardStyle from '../../custom-components/selectable-card/style';
import GeneralFeatureWithSearch from '../../custom-components/GeneralFeatureWithSearch/GeneralFeatureStyle';
import { alertTheme } from '../../custom-components/Toaster';

const componentStyles = {
  components: {
    Button: button,
    Checkbox: checkbox.component,
    Accordion: AccordionStyle.component,
    Tabs: TabVariant,
    Radio: RadioStyles.component,
    Alert: alertTheme
  },

  styles: {
    global: {
      ...TimelineStyle.style,
      ...TextInputStyle.style,
      ...ErrorTextStyle.style,
      ...BreadcrumbComponent.style,
      ...ToggleSwitch.style,
      ...SelectStyle.style,
      ...FileUploadStyle.style,
      ...DatePickerStyle.style,
      ...FormLabelStyle.style,
      ...AccordionStyle.style,
      ...FormTitleStyle.style,
      ...CardStyle.style,
      ...ToggleSwitchNew.style,
      ...PaginationStyles.style,
      ...TableStyles.style,
      ...TextAreaStyles.style,
      ...RadioStyles.style,
      ...FormModalStyle.style,
      ...SideMenuStyle.style,
      ...GeneralMenuStyle.style,
      ...ExpandableCardStyle.style,
      ...SideMenuStyle.style,
      ...VideoRecorderStyle.style,
      ...MapStyle.style,
      ...AudioRecorderStyle.style,
      ...ImageCaptureStyle.style,
      ...RichTextStyle.style,
      ...GeneralFeaturesMenuStyle.style,
      ...AlertStyle.style,
      ...MoreActionStyle.style,
      ...InfoPageStyle.style,
      ...TabStyle.style,
      ...PdfStyle.style,
      ...ChartStyle.style,
      ...RichLabelStyle.style,
      ...FeedbackRatingStyle.style,
      ...SelectableCardStyle.style,
      ...GeneralFeatureWithSearch.style
    }
  }
};

export default componentStyles;
