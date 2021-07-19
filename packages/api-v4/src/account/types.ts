import { APIWarning } from '../types';

export interface User {
  username: string;
  email: string;
  restricted: boolean;
  gravatarUrl?: string;
  ssh_keys: string[];
}

export interface Account {
  active_since: string;
  address_2: string;
  email: string;
  first_name: string;
  tax_id: string;
  credit_card: CreditCard;
  state: string;
  zip: string;
  address_1: string;
  country: string;
  last_name: string;
  balance: number;
  balance_uninvoiced: number;
  city: string;
  phone: string;
  company: string;
  active_promotions: ActivePromotion[];
  capabilities: AccountCapability[];
  euuid: string;
}

export type AccountCapability =
  | 'Linodes'
  | 'NodeBalancers'
  | 'Block Storage'
  | 'Object Storage'
  | 'Kubernetes'
  | 'Cloud Firewall'
  | 'Vlans'
  | 'Machine Images';

export interface AccountSettings {
  managed: boolean;
  longview_subscription: string | null;
  network_helper: boolean;
  backups_enabled: boolean;
  object_storage: 'active' | 'disabled' | 'suspended';
}

export interface ActivePromotion {
  description: string;
  summary: string;
  expire_dt: string | null;
  credit_remaining: string;
  this_month_credit_remaining: string;
  credit_monthly_cap: string;
  image_url: string;
  service_type: PromotionServiceType;
}

export type PromotionServiceType =
  | 'all'
  | 'backup'
  | 'blockstorage'
  | 'db_mysql'
  | 'ip_v4'
  | 'linode'
  | 'linode_disk'
  | 'linode_memory'
  | 'longview'
  | 'managed'
  | 'nodebalancer'
  | 'objectstorage'
  | 'transfer_tx';

export type ThirdPartyPayment = 'google_pay' | 'paypal';

export type CardType =
  | 'Visa'
  | 'MasterCard'
  | 'American Express'
  | 'Discover'
  | 'JCB';

export type PaymentType = 'credit_card' | ThirdPartyPayment;

export interface CreditCard {
  expiry: string | null;
  last_four: string | null;
  card_type?: CardType;
}

export interface Invoice {
  id: number;
  date: string;
  label: string;
  total: number;
  tax: number;
  subtotal: number;
}

export interface InvoiceItem {
  amount: number;
  from: null | string;
  to: null | string;
  label: string;
  quantity: null | number;
  type: 'hourly' | 'prepay' | 'misc';
  unit_price: null | string;
  tax: number;
  total: number;
}

export interface Payment {
  id: number;
  date: string;
  usd: number;
}

export interface PaymentResponse extends Payment {
  warnings?: APIWarning[];
}

export interface PaypalResponse {
  warnings?: APIWarning[];
}

export type GrantLevel = null | 'read_only' | 'read_write';

export interface Grant {
  id: number;
  permissions: GrantLevel;
  label: string;
}
export type GlobalGrantTypes =
  | 'add_linodes'
  | 'add_longview'
  | 'longview_subscription'
  | 'account_access'
  | 'cancel_account'
  | 'add_domains'
  | 'add_stackscripts'
  | 'add_nodebalancers'
  | 'add_images'
  | 'add_volumes';

export interface GlobalGrants {
  global: Record<GlobalGrantTypes, boolean | GrantLevel>;
}

export type GrantType =
  | 'linode'
  | 'domain'
  | 'nodebalancer'
  | 'image'
  | 'longview'
  | 'stackscript'
  | 'volume';

export type Grants = GlobalGrants & Record<GrantType, Grant[]>;

export interface NetworkUtilization {
  billable: number;
  used: number;
  quota: number;
}

export interface NetworkTransfer {
  bytes_in: number;
  bytes_out: number;
  bytes_total: number;
}

export interface CancelAccount {
  survey_link: string;
}

export interface CancelAccountPayload {
  comments: string;
}

export type NotificationType =
  | 'billing_email_bounce'
  | 'migration_scheduled'
  | 'migration_pending'
  | 'reboot_scheduled'
  | 'outage'
  | 'maintenance'
  | 'payment_due'
  | 'ticket_important'
  | 'ticket_abuse'
  | 'notice'
  | 'promotion'
  | 'user_email_bounce';

export type NotificationSeverity = 'minor' | 'major' | 'critical';

export interface Notification {
  entity: null | Entity;
  label: string;
  message: string;
  type: NotificationType;
  severity: NotificationSeverity;
  when: null | string;
  until: null | string;
  body: null | string;
}

export interface Entity {
  id: number;
  label: string;
  type: string;
  url: string;
}

export type EventAction =
  | 'account_update'
  | 'account_settings_update'
  | 'backups_cancel'
  | 'backups_enable'
  | 'backups_restore'
  | 'community_like'
  | 'community_mention'
  | 'community_question_reply'
  | 'credit_card_updated'
  | 'disk_create'
  | 'disk_update'
  | 'disk_delete'
  | 'disk_duplicate'
  | 'disk_imagize'
  | 'disk_resize'
  | 'domain_create'
  | 'domain_update'
  | 'domain_delete'
  | 'domain_record_create'
  | 'domain_record_updated'
  | 'domain_record_delete'
  | 'entity_transfer_accept'
  | 'entity_transfer_cancel'
  | 'entity_transfer_create'
  | 'entity_transfer_fail'
  | 'entity_transfer_stale'
  | 'firewall_create'
  | 'firewall_delete'
  | 'firewall_device_add'
  | 'firewall_device_remove'
  | 'firewall_disable'
  | 'firewall_enable'
  | 'firewall_update'
  | 'host_reboot'
  | 'image_update'
  | 'image_upload'
  | 'image_delete'
  | 'lassie_reboot'
  | 'linode_addip'
  | 'linode_boot'
  | 'linode_clone'
  | 'linode_create'
  | 'linode_update'
  | 'linode_delete'
  | 'linode_deleteip'
  | 'linode_migrate'
  | 'linode_reboot'
  | 'linode_resize'
  | 'linode_resize_create'
  | 'linode_migrate_datacenter_create'
  | 'linode_migrate_datacenter'
  | 'linode_mutate'
  | 'linode_mutate_create'
  | 'linode_rebuild'
  | 'linode_shutdown'
  | 'linode_snapshot'
  | 'linode_config_create'
  | 'linode_config_update'
  | 'linode_config_delete'
  | 'lke_node_create'
  | 'longviewclient_create'
  | 'longviewclient_delete'
  | 'longviewclient_update'
  | 'nodebalancer_config_create'
  | 'nodebalancer_config_update'
  | 'nodebalancer_config_delete'
  | 'nodebalancer_create'
  | 'nodebalancer_update'
  | 'nodebalancer_delete'
  | 'password_reset'
  | 'profile_update'
  | 'stackscript_create'
  | 'stackscript_update'
  | 'stackscript_delete'
  | 'stackscript_publicize'
  | 'stackscript_revise'
  | 'tfa_enabled'
  | 'tfa_disabled'
  | 'ticket_attachment_upload'
  | 'user_ssh_key_add'
  | 'user_ssh_key_update'
  | 'user_ssh_key_delete'
  | 'volume_create'
  | 'volume_update'
  | 'volume_delete'
  | 'volume_detach'
  | 'volume_attach'
  | 'volume_resize'
  | 'volume_clone';

export type EventStatus =
  | 'scheduled'
  | 'started'
  | 'finished'
  | 'failed'
  | 'notification';

export interface Event {
  id: number;
  action: EventAction;
  created: string;
  entity: Entity | null;
  /*
    NOTE: events before the duration key was added will have a duration of 0
  */
  duration: number | null;
  percent_complete: number | null;
  rate: string | null;
  read: boolean;
  seen: boolean;
  status: EventStatus;
  time_remaining: null | string;
  username: string;
  secondary_entity: Entity | null;
  _initial?: boolean;
  message: string | null;
}
/**
 * Represents an event which has an entity. For use with type guards.
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
export interface EntityEvent extends Event {
  entity: Entity;
}

export interface OAuthClient {
  id: string;
  label: string;
  redirect_uri: string;
  thumbnail_url: string;
  public: boolean;
  status: 'disabled' | 'active' | 'suspended';
}

export interface OAuthClientRequest {
  label: string;
  redirect_uri: string;
  public?: boolean;
}

export interface Paypal {
  cancel_url: string;
  redirect_url: string;
  usd: string;
}

export interface ExecutePayload {
  payer_id: string;
  payment_id: string;
}

export interface SaveCreditCardData {
  card_number: string;
  expiry_year: number;
  expiry_month: number;
  cvv: string;
}

export interface AccountMaintenance {
  reason: string;
  status: 'pending' | 'started';
  type: 'reboot' | 'cold_migration' | 'live_migration';
  when: string;
  entity: {
    id: number;
    label: string;
    type: string;
    url: string;
  };
}

export interface PaymentMethod {
  id: number;
  type: PaymentType;
  is_default: boolean;
  created: string;
  data: CreditCard;
}

export interface ClientToken {
  client_token: string;
}

export interface PaymentMethodData {
  type: 'credit_card' | 'payment_method_nonce';
  data: SaveCreditCardData | { nonce: string };
  is_default: boolean;
}

export interface MakePaymentData {
  usd: string;
  cvv?: string;
  nonce?: string;
  payment_method_id?: number;
}
