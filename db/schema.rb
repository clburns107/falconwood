# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170116213104) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bands", force: :cascade do |t|
    t.string   "band_name"
    t.datetime "start_time"
    t.datetime "end_time"
    t.text     "description"
    t.text     "notes"
    t.string   "facebook_link"
    t.string   "instagram_link"
    t.string   "twitter_link"
    t.string   "youtube_link"
    t.string   "website_link"
    t.text     "rider"
    t.datetime "load_in_time"
    t.datetime "sound_check_time"
    t.text     "pay_agreement"
    t.integer  "settled_amount"
    t.integer  "event_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree
  end

  create_table "events", force: :cascade do |t|
    t.string   "event_name"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.datetime "start_time"
    t.datetime "end_time"
    t.text     "description"
    t.text     "notes"
    t.integer  "guest_number"
    t.integer  "head_table_count"
    t.text     "alcohol_order"
    t.text     "table_arrangement"
    t.text     "catering_instructions"
    t.integer  "glamp_site_number"
    t.string   "ceremony_site"
    t.text     "schedule"
    t.integer  "rental_fee"
    t.string   "ticket_link"
    t.string   "rating"
    t.datetime "door_time"
    t.datetime "presale_ticket_number"
    t.datetime "door_ticket_number"
  end

end
