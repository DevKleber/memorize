<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;

class Filter extends Model
{
    public static function searchWhere($query, $model, $whereJoin = [])
    {
        $search = Request::get('search') ?? false;

        if (!$search) {
            return $query;
        }

        $path = explode('\\', $model);
        $model = array_pop($path);
        $model = str_replace('Controller', '', $model);
        $class = '\App\\'.$model;

        $modelParent = new $class();
        $fillable = $modelParent->getFillable();

        $query->where(function ($query) use ($search,$fillable,$modelParent,$whereJoin) {
            foreach ($fillable as $column) {
                $query->orWhere($modelParent->getTable().'.'.$column, 'ilike', "%{$search}%");
            }
            foreach ($whereJoin as $value) {
                $query->orWhere($value, 'ilike', "%{$search}%");
            }
        });

        return $query;
    }

    public static function orderBy($query)
    {
        $order = Request::get('order') ?? false;
        $orderType = Request::get('orderType') ?? 'asc';

        if (!$order) {
            return $query;
        }

        return $query->orderBy("{$order}", "{$orderType}");
    }

    public static function paginate($query)
    {
        $paginate = Request::get('page') ?? false;
        if (!$paginate) {
            return $query->get();
        }

        return $query->paginate(5);
    }
}
