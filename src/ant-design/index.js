import {
    Layout, Menu, Row, Col,
    ConfigProvider,
    Form, Input, Button,
    Radio, Checkbox, Select, DatePicker,
    TimePicker, Calendar, Popconfirm,
    Table, Modal, Pagination,
    Dropdown, Avatar,
    Tabs,
    Breadcrumb,
} from 'ant-design-vue'

export const components = [
    Layout, Menu, Row, Col,
    ConfigProvider,
    Form, Input, Button,
    Radio, Checkbox, Select, DatePicker,
    TimePicker, Calendar, Popconfirm,
    Table, Modal, Pagination,
    Dropdown, Avatar,
    Tabs,
    Breadcrumb,
]

export function setupAn(app) {
    components.forEach(component => {
        app.use(component)
    })
}